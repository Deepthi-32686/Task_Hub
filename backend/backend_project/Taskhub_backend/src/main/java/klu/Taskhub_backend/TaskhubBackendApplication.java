package klu.Taskhub_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TaskhubBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskhubBackendApplication.class, args);
		System.out.println("server started");
	}

}
