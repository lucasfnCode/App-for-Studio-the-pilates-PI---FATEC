@RestController
@RequestMapping("/aulas")
public class AulaController {
    @Autowired
    private AulaService aulaService;

    @GetMapping
    public List<Aula> listarAulas() {
        return aulaService.listarAulas();
    }

    @PostMapping
    public Aula salvarAula(@RequestBody Aula aula) {
        return aulaService.salvarAula(aula);
    }
}