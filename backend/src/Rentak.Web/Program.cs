using OpenTelemetry;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using Rentak.Application;
using Rentak.Infrastructure;
using Rentak.Web.Components;
using Scalar.AspNetCore;
using Serilog;
using Serilog.Sinks.OpenTelemetry;

var builder = WebApplication.CreateBuilder(args);

//----------------------------------------------------------------------------------------
// Logging - Serilog to write structured logs to console and 
// the Aspire Dashboard (OTLP, default http://localhost:4317)
//----------------------------------------------------------------------------------------
var otlpEndpoint = builder.Configuration["Otlp:Endpoint"] ?? "http://localhost:4317";

builder.Services.AddSerilog((services, log) => log
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.OpenTelemetry(o =>
    {
        o.Endpoint = otlpEndpoint;
        o.Protocol = OtlpProtocol.Grpc;
        o.ResourceAttributes = new Dictionary<string, object> { ["service.name"] = "Rentak" };
    }));

//----------------------------------------------------------------------------------------
// Traces + metrics - OpenTelemetry, exported to the same dashboard as the logs, 
// i.e. the Aspire Dashboard (OTLP, default http://localhost:4317)
//----------------------------------------------------------------------------------------
builder.Services.AddOpenTelemetry()
    .ConfigureResource(r => r.AddService("rentak"))
    .WithTracing(t => t
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation())
    .WithMetrics(m => m
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation())
    .UseOtlpExporter(OpenTelemetry.Exporter.OtlpExportProtocol.Grpc, new Uri(otlpEndpoint));

//----------------------------------------------------------------------------------------
// Application and infrastructure services
//----------------------------------------------------------------------------------------
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

//----------------------------------------------------------------------------------------
// Web services - Blazor (portal), OpenAPI (API docs), health checks.
//----------------------------------------------------------------------------------------
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
builder.Services.AddOpenApi();
builder.Services.AddHealthChecks();

var app = builder.Build();

//----------------------------------------------------------------------------------------
// The request pipeline - every HTTP request flows through these top to bottom.
//----------------------------------------------------------------------------------------

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();           // OpenAPI docs only in development
    app.MapScalarApiReference(); // Scalar API reference only in development (interactive API docs for the portal)
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
};  

app.UseSerilogRequestLogging();
app.UseAntiforgery();

app.MapStaticAssets();
app.MapHealthChecks("/healthz");

app.MapGet("/api/ping", () => new { status = "ok", at = DateTime.UtcNow })
    .WithName("Ping")
    .WithSummary("Smoke-test endpoint; removed later.");

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();

public partial class Program; // for integration tests