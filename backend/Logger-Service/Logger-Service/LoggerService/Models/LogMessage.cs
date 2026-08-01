namespace LoggerService.Models
{
    public class LogMessage
    {
        public string ServiceName { get; set; }

        public string UserRole { get; set; }

        public long? UserId { get; set; }

        public string Message { get; set; }

        public string LogLevel {  get; set; }

        public DateTime Timestamp { get; set; }

        public string RequestId { get; set; }
    }
}
