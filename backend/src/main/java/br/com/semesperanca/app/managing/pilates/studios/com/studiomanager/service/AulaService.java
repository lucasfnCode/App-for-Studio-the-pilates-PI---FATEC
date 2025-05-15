@Service 

public class AulaService {
    
    @AutoWired
    
    private AulaRepository aulaRepository;

    public List<Aula> listarAulas(){
        return aulaRepository.findAll();
    }

    public Aula salvarAula(Aula aula) {
        return aulaRepository.save(aula);
    }

}