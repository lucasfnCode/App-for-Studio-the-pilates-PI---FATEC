/* global use, db */

// Seleciona o banco de dados que você está utilizando.
use('Pilates');

// Cria a coleção 'Usuarios' e insere os documentos.
db.getCollection('Usuarios').insertMany([
    {
        "_id": ObjectId("67f08638d5ffb65cce5d5790"),
        "name": "João papai",
        "role": "aluno",
        "cpf": "5465865368568996",
        "birthDate": "2000-05-15",
        "email": "joao.silva@example.com",
        "contact": "(11) 91234-5678",
        "photo": "https://exemplo.com/fotos/joao.jpg",
        "assessment": {
            "description": "Avaliação física inicial",
            "professional": "Prof. Ana Souza",
            "posturalPhoto": "https://exemplo.com/posturas/joao.jpg",
            "relevantData": "Paciente com histórico de dores lombares"
        },
        "progress": "Iniciado",
        "plan": {
            "modality": "Pilates Solo",
            "frequency": "3x por semana",
            "duration": "3 meses",
            "startDate": "2025-06-01",
            "paymentMethod": "Cartão de Crédito",
            "discount": "10.0",
            "paymentType": "Mensal",
            "firstPaymentDate": "2025-06-01",
            "dueDate": "2025-06-10"
        },
        "clientArea": {
            "paymentDueDate": "2025-06-10",
            "makeUps": 2,
            "paymentProof": "https://exemplo.com/comprovantes/123.pdf",
            "fiscalReceipt": "https://exemplo.com/notas/123.pdf",
            "contract": "https://exemplo.com/contratos/joao.pdf",
            "upComingClasses": [
                {
                    "date": "2025-05-25",
                    "time": "10:00:00",
                    "status": "Confirmado"
                },
                {
                    "date": "2025-05-27",
                    "time": "14:00:00",
                    "status": "Agendado"
                }
            ],
            "imageAuthorization": true
        },
        "isActive": true
    },


    {
        "_id": ObjectId("67f08638d5ffb65cce5d5787"),
        "nome": "João Silva",
        "tipo": "instrutor",
        "formacao": "Educação Física",
        "conselho": "CREF 123456-G/SP",
        "email": "joao.silva@example.com",
        "data_nascimento": "1985-03-15",
        "contato": "(11) 98888-1234",
        "data_contratacao": "2022-01-10",
        "foto": "joao.jpg",
        "permissoes": [
            "marcar_presenca",
            "marcar_falta",
            "reagendar_aula",
            "visualizar_agenda",
            "registrar_evolucao",
            "registrar_reavaliacao"
        ]
    },
    {
        "_id": ObjectId("67f08646d5ffb65cce5d5746"),
        "nome": "Ana Souza",
        "tipo": "recepcionista",
        "formacao": "Administração",
        "email": "ana.souza@example.com",
        "data_nascimento": "1993-10-05",
        "contato": "(11) 91234-5678",
        "data_contratacao": "2023-02-15",
        "foto": "ana.jpg",
        "permissoes": [
            "marcar_aula_experimental",
            "cadastrar_aluno",
            "vender_plano",
            "agendar_aulas",
            "desmarcar_aula",
            "reagendar_aula",
            "alterar_aula_fixa",
            "informar_ferias_licenca",
            "reativar_plano"
        ]
    },
    {
        "_id": ObjectId("67f08658d5ffb65cce5d5758"),
        "nome": "Carlos Mendes",
        "tipo": "administrador",
        "formacao": "Gestão Empresarial",
        "email": "carlos.mendes@example.com",
        "data_nascimento": "1980-09-30",
        "contato": "(11) 99999-8888",
        "data_contratacao": "2020-08-01",
        "foto": "carlos.jpg",
        "permissoes": [
            "emitir_nota_fiscal",
            "controlar_financas",
            "cancelar_planos",
            "suspender_planos",
            "gerenciar_agendas",
            "abrir_agenda_studio"
        ]
    }
]);

db.getCollectionNames();



