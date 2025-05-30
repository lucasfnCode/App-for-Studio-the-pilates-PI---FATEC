package br.com.semesperanca.app.managing.pilates.studios.application.controller;

import br.com.semesperanca.app.managing.pilates.studios.application.model.Session.SessionInputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.Session.SessionOutputDTO;
import br.com.semesperanca.app.managing.pilates.studios.application.model.Session.StudentRegisterDTO;
import br.com.semesperanca.app.managing.pilates.studios.service.SessionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
<<<<<<< HEAD
=======
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
>>>>>>> origin/felps-session

@AllArgsConstructor
@RestController
@RequestMapping("/sessions")

public class SessionController {

    private final SessionService service;

    @GetMapping("/actives")
    public ResponseEntity<List<SessionOutputDTO>> listAllActive() {
        return ResponseEntity.ok(service.listAllActiveSessions());
    }

    @GetMapping()
    public ResponseEntity<List<SessionOutputDTO>> listAll() {
        return ResponseEntity.ok(service.listAllSessions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SessionOutputDTO> listById(@PathVariable String id) {
        return ResponseEntity.ok(service.listSessionById(id));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<SessionOutputDTO>> listByIdStudent(@PathVariable String id) {
        return ResponseEntity.ok(service.listSessionByStudentId(id));
    }

    @GetMapping("/current")
    public ResponseEntity<List<SessionOutputDTO>> listAllCurrent() {
        return ResponseEntity.ok(service.listAllCurrentSessionsWithDayLimiter());
    }

    @GetMapping("/day/{day}")
    public ResponseEntity<List<SessionOutputDTO>> listByDay(@PathVariable LocalDate day) {
        return ResponseEntity.ok(service.listSessionByDay(day));
    }

    @PostMapping()
    public ResponseEntity<SessionOutputDTO> open(@RequestBody SessionInputDTO session) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.openSession(session));
    }

    @PostMapping("/register/{sessionId}")
    public SessionOutputDTO addStudentInSession(@PathVariable String sessionId, @RequestBody StudentRegisterDTO dto) {
        return service.registerStudentInSession(dto.studentId(), sessionId);
    }

<<<<<<< HEAD
=======
    @PostMapping("/presence/{sessionId}")
    public SessionOutputDTO registerPresence(@PathVariable String sessionId, @RequestBody List<String> studentIds) {
        return service.registerPresencesInSession(studentIds, sessionId);
    }

>>>>>>> origin/felps-session
    @PutMapping("/{id}")
    public ResponseEntity<SessionOutputDTO> update(@PathVariable String id, @RequestBody SessionInputDTO session) {
        return ResponseEntity.status(HttpStatus.OK).body(service.updateSessionById(id, session));
    }

    @PutMapping("/unregister/{sessionId}")
<<<<<<< HEAD
    public ResponseEntity<SessionOutputDTO> unregisterStudent(@PathVariable String sessionId,
            @RequestBody StudentRegisterDTO dto) {
        return ResponseEntity.ok(service.unregisterStudentFromSession(dto.studentId(), sessionId));
    }

=======
    public ResponseEntity<SessionOutputDTO> unregisterStudent(@PathVariable String sessionId, @RequestBody StudentRegisterDTO dto) {
        return ResponseEntity.ok(service.unregisterStudentFromSession(dto.studentId(), sessionId));
    }

    @PutMapping("presence/{sessionId}")
    public SessionOutputDTO unregisterPresence(@PathVariable String sessionId, @RequestBody List<String> studentIds) {
        return service.unregisterPresencesInSession(studentIds, sessionId);
    }

>>>>>>> origin/felps-session
    @DeleteMapping("/{id}")
    public ResponseEntity<SessionOutputDTO> desactive(@PathVariable String id) {
        return ResponseEntity.ok(service.desactiveSessionById(id));
    }

}
