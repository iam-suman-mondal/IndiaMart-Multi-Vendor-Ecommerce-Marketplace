package com.cdac.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;

@Configuration
public class RabbitMQConfig {

	public static final String NOTIFICATION_QUEUE = "notification_queue";

	public static final String NOTIFICATION_EXCHANGE = "notification_exchange";

	public static final String ROUTING_KEY = "notification.email";
	
	 public static final String LOG_QUEUE = "central-logs";
	


	  @Bean
	  public Queue logQueue() {
	        return new Queue(LOG_QUEUE, true);
	    }
	 
    @Bean
    public Queue queue() {
        return QueueBuilder
                .durable(NOTIFICATION_QUEUE)
                .build();
    }

    @Bean
    public DirectExchange exchange() {
        return new DirectExchange(NOTIFICATION_EXCHANGE);
    }

    @Bean
    public Binding binding(Queue queue, DirectExchange exchange) {
        return BindingBuilder
                .bind(queue)
                .to(exchange)
                .with(ROUTING_KEY);
    }
    
    @Bean
	public MessageConverter jsonMessageConverter() {
	    return new Jackson2JsonMessageConverter();
	}
    
    
    @Bean
    public RabbitTemplate rabbitTemplate(
            ConnectionFactory connectionFactory,
            MessageConverter messageConverter) {

        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setConnectionFactory(connectionFactory);
        template.setMessageConverter(messageConverter);

        return template;
    }
    
}