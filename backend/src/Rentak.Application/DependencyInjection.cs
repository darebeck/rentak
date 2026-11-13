using Microsoft.Extensions.DependencyInjection;

namespace Rentak.Application;

public static class DependencyInjection
{
  public static IServiceCollection AddApplication(this IServiceCollection services)
  {
    return services;
  }
}