package br.com.semesperanca.app.managing.pilates.studios;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
    exclude = {
        org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration.class,
        org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration.class,
        org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration.class
    }
)
public class AppManagingPilatesStudiosApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppManagingPilatesStudiosApplication.class, args);
	}

}


