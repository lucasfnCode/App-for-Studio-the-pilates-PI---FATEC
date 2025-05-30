package br.com.semesperanca.app.managing.pilates.studios.model.session;

<<<<<<< HEAD
import java.time.LocalDate;
import java.util.List;

=======
>>>>>>> origin/felps-session
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import br.com.semesperanca.app.managing.pilates.studios.model.studio.Schedules;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

<<<<<<< HEAD
=======
import java.time.LocalDate;
import java.util.List;

>>>>>>> origin/felps-session
@RequiredArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Aulas")

public class Session {

    @Id
    private String id;

    @NonNull
    private List<String> students;
    @NonNull
    private String studio;
    @NonNull
    private String instructor;
    @NonNull
    private LocalDate day;
    @NonNull
    private Schedules hours;
    @NonNull
    private SessionStatus status;
    @NonNull
<<<<<<< HEAD
=======
    private List<String> presences;
    @NonNull
>>>>>>> origin/felps-session
    private String type;
    @NonNull
    private Boolean isActive;

}
