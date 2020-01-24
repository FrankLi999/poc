package io.confluent.examples.consumer;


import java.time.Duration;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.CountDownLatch;

import org.apache.avro.generic.GenericRecord;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRebalanceListener;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.errors.WakeupException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <p>This example demonstrates the usage of basic poll loop and 
 * consumer coordination in a group<p>
 * 
 * <p> Run multiple {@link BasicConsumeLoop} by providing same group id and 
 * different client id so that all the consumer instances belongs
 * to a same group and consumption load gets re-balanced across
 * the consumer instances.<p>
 */
public class BasicConsumeLoop implements Runnable {

	private static final Logger logger = LoggerFactory.getLogger(BasicConsumeLoop.class);

	private final KafkaConsumer<String, GenericRecord> consumer;
	private final List<String> topics;
	private final String clientId;

	private CountDownLatch shutdownLatch = new CountDownLatch(1);
	
	public BasicConsumeLoop(Properties configs, List<String> topics) {
		this.clientId = configs.getProperty(ConsumerConfig.CLIENT_ID_CONFIG);
		this.topics = topics;
		this.consumer = new KafkaConsumer<>(configs);
	}

	@Override
	public void run() {

		try {
			logger.info("Starting the Consumer : {}", clientId);

			ConsumerRebalanceListener listener = new ConsumerRebalanceListener() {
				@Override
				public void onPartitionsRevoked(Collection<TopicPartition> partitions) {
					logger.info("C : {}, Revoked partitionns : {}", clientId, partitions);
				}
				
				@Override
				public void onPartitionsAssigned(Collection<TopicPartition> partitions) {
					logger.info("C : {}, Assigned partitions : {}", clientId, partitions);
				}
			};
			consumer.subscribe(topics, listener);

			logger.info("C : {}, Started to process records", clientId);
			while (true) {
				ConsumerRecords<String, GenericRecord> records = consumer.poll(Duration.ofMillis(Long.MAX_VALUE));
				if(records.isEmpty()) {
					logger.info("C : {}, Found no records", clientId);
					continue;
				}
			
				logger.info("C : {} Total No. of records received : {}", clientId, records.count());
				for (ConsumerRecord<String, GenericRecord> record : records) {
					logger.info("C : {}, Record received partition : {}, key : {}, value : {}, offset : {}",
							clientId, record.partition(), record.key(), record.value(), record.offset());
					
					 String topic = record.topic();
				      int partition = record.partition();
				      long offset = record.offset();
				      Object key = record.key();
				      GenericRecord message = (GenericRecord) record.value();
				      System.out.println(" Received: " + "Topic " + topic +
				                         " Partition " + partition +
				                         " Offset " + offset +
				                         " Key " + key +
				                         " Message " + message.toString());
					sleep(50);
				}
				
				
				// `enable.auto.commit` set to true. coordinator automatically commits the offsets
				// returned on the last poll(long) for all the subscribed list of topics and partitions
			}
		} catch (WakeupException e) {
			// Ignore, we're closing
		} finally {
			consumer.close();
			shutdownLatch.countDown();
			logger.info("C : {}, consumer exited", clientId);
		}
	}
	
	private void sleep(long millis) {
		try {
			Thread.sleep(millis);
		} catch (InterruptedException e) {
			logger.error("Error", e);
		}
	}
	
	public void close() {
		try {
			consumer.wakeup();
			shutdownLatch.await();
		} catch (InterruptedException e) {
			logger.error("Error", e);
		}
	}

	public static void main(String[] args) throws InterruptedException {
		
		if (args.length != 4) {
	      System.out.println("Please provide command line arguments: "
	                         + "bootstrapServers groupId topic schemaRegistryUrl");
	      System.exit(-1);
	    }

	    String bootstrapServers = args[0];
	    String groupId = args[1];
	    String topic = args[2];
	    List<String> topics = new ArrayList<>();
	    topics.add(topic);
	    String url = args[3];
	    
	    
		Properties configs = getConsumerConfigs(bootstrapServers, groupId, url);
		final BasicConsumeLoop consumer = new BasicConsumeLoop(configs, topics);
		consumer.run();
		Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
			@Override
			public void run() {
				consumer.close();
			}
		}));
			
		
	}

	private static Properties getConsumerConfigs(String bootstrapServers, String groupId, String url) {
		Properties configs = new Properties();
		configs.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
		configs.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
		configs.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, "false");
//		configs.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, "true");
//		configs.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest"); //or latest
		configs.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "latest"); //or latest
		configs.put("schema.registry.url", url);
        configs.put("specific.avro.reader", true);
		configs.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer");
		configs.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, "io.confluent.kafka.serializers.KafkaAvroDeserializer");
        
//	    configs.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, result.getString("auto.offset.reset"));
//		configs.put(ConsumerConfig.GROUP_ID_CONFIG, result.getString("groupId"));
//		configs.put(ConsumerConfig.CLIENT_ID_CONFIG, result.getString("clientId"));
//		configs.put(ConsumerConfig.MAX_PARTITION_FETCH_BYTES_CONFIG, result.getString("max.partition.fetch.bytes"));
//

//		configs.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, CustomDeserializer.class.getName());
//		configs.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, CustomDeserializer.class.getName());
	
	    return configs;
    }
}

