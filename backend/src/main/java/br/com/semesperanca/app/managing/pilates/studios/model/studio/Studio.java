package br.com.semesperanca.app.managing.pilates.studios.model.studio;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Data
@Document(collection = "Studios")
public class Studio {

    @Id
    private String id;

    @NonNull
    private String name;
    @NonNull
    private String address;
    @NonNull
    private List<DaysOfWeek> daysOperation;
    @NonNull
    private List<Schedules> openingHours;
    @NonNull
    private Integer limitStudentsPerClass;
    @NonNull
    private List<Schedules> unavailableTimes;
    @NonNull
    private Map<Schedules, String> instructorsByTime;
    @NonNull
    private List<String> holidays;
    @NonNull
    private List<String> recesses;
    @NonNull
    private Boolean isActive;
}
