using LoggerService.Models;
using Microsoft.AspNetCore.SignalR;

namespace LoggerService.Services
{
    public class FileLoggerService
    {
       private readonly string _logDirectory;
       
        public FileLoggerService()
        {
            _logDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Logs");

            Directory.CreateDirectory(_logDirectory);
        }

        public async Task WriteLogAsync(LogMessage logMessage)
        {
            string fileName;

            if(logMessage.LogLevel.Equals("Error", StringComparison.OrdinalIgnoreCase))
            {
                fileName = "Error.log";
            }
            else
            {
                fileName = logMessage.UserRole.ToUpper() switch
                {
                    "ROLE_ADMIN" => "Admin.log",
                    "ROLE_VENDOR" => "Vendor.log",
                    "ROLE_CUSTOMER" => "Customer.log",
                    _ => "System.log"
                };
            }

            string filePath = Path.Combine(_logDirectory, fileName);

            string logText = $"|{logMessage.Timestamp:yyyy-MM-dd HH:mm:ss}|"+
                             $"|Service: {logMessage.ServiceName}|-"+
                             $"|User: {logMessage.UserId}|-"+
                             $"|Role: {logMessage.UserRole}|-"+
                             $"|{logMessage.LogLevel}|-" +
                             $"|{logMessage.Message}|-" +
                             $"|RequestId: {logMessage.RequestId}|";


            await File.AppendAllTextAsync(
                filePath,
                logText + Environment.NewLine);
        }
    }
}
