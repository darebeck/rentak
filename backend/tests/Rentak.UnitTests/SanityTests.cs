using Shouldly;

namespace Rentak.UnitTests;

public class SanityTests
{
  [Fact]
  public void Arithmetic_still_works() => (2 + 2).ShouldBe(4);
}