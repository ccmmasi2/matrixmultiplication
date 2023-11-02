using Matrix.Multiplication.AccessData.Data;
using Matrix.Multiplication.AccessData.Init;
using Matrix.Multiplication.AccessData.ObjectRepository.Implementation;
using Matrix.Multiplication.AccessData.ObjectRepository.Interface;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("MatrixConectionDB");
builder.Services.AddDbContext<AppDbContext>(options =>  options.UseSqlServer(connectionString));

builder.Services.AddScoped<IDBInitializer, DBInitializer>();
builder.Services.AddScoped<IProcessRepository, ProcessRepository>();
builder.Services.AddScoped<IProcessMatrixRepository, ProcessMatrixRepository>();
builder.Services.AddScoped<IProcessMatrixDetailRepository, ProcessMatrixDetailRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowOrigin");

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var loggerFactory = services.GetRequiredService<ILoggerFactory>();

    try
    {
        var initializer = services.GetRequiredService<IDBInitializer>();
        initializer.Initialize();
    }
    catch (Exception ex)
    {
        var logger = loggerFactory.CreateLogger<Program>();
        logger.LogError(ex, "Error in migration");
    }
}

app.MapControllers();

app.Run();
