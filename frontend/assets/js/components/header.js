export const headerHtml = `

    <nav class="d-flex justify-content-center border-bottom text-bg-warning">
        <section class="container-sm text text-center">
            <h1>Bem Vindo ao Studio</h1>  
        </section>
    </nav>
    
`;

const headerElement = document.createElement('header');
headerElement.innerHTML = headerHtml;
document.body.insertAdjacentElement('afterbegin', headerElement);