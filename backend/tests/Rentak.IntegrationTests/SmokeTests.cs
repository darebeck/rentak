using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;
using Shouldly;

namespace Rentak.IntegrationTests;

public class SmokeTests(WebApplicationFactory<Program> factory) : IClassFixture<WebApplicationFactory<Program>>
{
    [Fact]
    public async Task Health_endpoint_returns_200()
    {
        var client = factory.CreateClient();
        var response = await client.GetAsync("/healthz", TestContext.Current.CancellationToken);
        response.StatusCode.ShouldBe(HttpStatusCode.OK);
    }
}
