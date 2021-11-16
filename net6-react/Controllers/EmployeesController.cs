using Microsoft.AspNetCore.Mvc;

namespace net6_react.Controllers;

public record User(int Id, string Name, string Email, IEnumerable<string> Roles, int? BossId);

[ApiController]
[Route("[controller]")]
public class EmployeesController : ControllerBase
{
    private static readonly User[] Users = new[]
    {
        new User(1, "Ola Olsen", "ola@x.no", new [] { "Daglig leder" }, null),
        new User(101, "Pelle Persen", "pelle@x.no", new [] { "Ukentlig leder" }, 1),
        new User(201, "Arne Arntsen", "arne@x.no", new [] { "Dreng" }, 101),
        new User(202, "Ulle Urvik", "beanie_baby_collector_2291@hotmail.com", new [] { "Byssegutt" }, 101),
    };

    [HttpGet]
    public async Task<IEnumerable<User>> GetAsync(int delay = 1000)
    {
        await Task.Delay(delay);
        return Users;
    }

    [HttpGet, Route("modified")]
    public IEnumerable<User> GetModified()
    {
        // Returner brukerne, men med navn uppercased og negativ userId (101 => -101)
        // Organisasjons-strukturen må bevares (Id / BossId)
        
        throw new NotImplementedException();
    }

    [HttpGet, Route("boss")]
    public User? GetTheBoss()
    {
        throw new NotImplementedException();
    }

    [HttpGet, Route("fakes/{count:int}")]
    public IEnumerable<User> GetFakes(int count)
    {
        // Generer {count} fiktive ansatte
        throw new NotImplementedException();
    }

    [HttpGet, Route("names")]
    public IEnumerable<string> GetEmployeeNames()
    {
        throw new NotImplementedException();
    }

    [HttpGet, Route("search/{query}")]
    public IEnumerable<User> FindUsers(string query)
    {
        // Søk på navn, e-post, roller
        throw new NotImplementedException();
    }
}