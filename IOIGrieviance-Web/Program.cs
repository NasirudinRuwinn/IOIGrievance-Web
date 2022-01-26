using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog.Core;
using Serilog.Events;

namespace IOIGrieviance_Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var currentEnv = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            //MyLoggingLevelSwitch = new LoggingLevelSwitch();
            //MyLoggingLevelSwitch.MinimumLevel = LogEventLevel.Verbose;

            //var configuration = new ConfigurationBuilder()
            //.AddJsonFile("appsettings.json")
            //.AddEnvironmentVariables()
            //.Build();

            //Log.Logger = new LoggerConfiguration()
            //.WriteTo.RollingFile(Path.Combine(env.ContentRootPath, "log-{Date}.txt"))
            //.CreateLogger();
            //Log.Logger = new LoggerConfiguration()
            //.ReadFrom.Configuration(configuration)
            //.CreateLogger();
            //Log.Logger = new LoggerConfiguration()
            //.ReadFrom.Configuration(configuration)
            //.CreateLogger();
            CreateWebHostBuilder(args).Build().Run();

            try
            {
                CreateWebHostBuilder(args).Build().Run();
            }
            finally
            {
                //Log.CloseAndFlush();
            }
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                //.UseSerilog()
                .UseStartup<Startup>();
    }
}
