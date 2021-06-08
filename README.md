# Segurança

**Problema:** Um dos pontos levantados pela LGBD é que o cliente sempre deve ter a opção de solicitar
que seus dados sejam apagados da base de dados de uma empresa, e isso não se limita apenas a base
de dados atual, a empresa deve garantir que os dados do cliente foram apagados tanto da base de
dados atual quanto dos backups de segurança.

**Contexto:** A aplicação na qual vamos trabalhar é um chat que já tem uma base de dados populada e
necessita se adaptar as novas normas da LGBP. Uma das complexidades relacionadas a esse sistema é
que mesmo depois de atender a solicitação de um cliente para apagar os seus dados a base de dados
precisa manter a sua integridade e não perder os registros das conversas que esse cliente teve com
outros clientes.

**Proposta de Solução:** Para lidar esse problema será criada uma lista de solicitações de exclusão de
dados. As solicitações de exclusão serão executadas na base de produção assim que forem submetidas e
serão desenvolvidas rotinas que garantem que a lista de exclusão seja executada em um backup assim
que ele for restaurado e antes que seja liberado para produção.

# Entregas 

## Sprint 1 (28/03)
 - Estruturação do basica do Projeto;
 - Rotinas para registrar a lista de exclusões;
 - Rotina que é executada toda vez que o sistema é iniciado consumindo a lista de exclusões;
## Sprint 2 (18/04)
 - Exposição de algumas funcionalidades do sistema em rotas de uma Api;
    -![Alt Text](https://raw.githubusercontent.com/fatec-seguranca/seguranca/master/content/print_routes.png)
 - Implementar um front basico;
    -![Alt Text](https://raw.githubusercontent.com/fatec-seguranca/seguranca/master/content/gif_exclusion_form.gif)
 - Melhorar a forma como os logs de execução da lista de exclusão são apresentados, para dar uma visão mais proxima da realidade para o cliente.
    -![Alt Text](https://raw.githubusercontent.com/fatec-seguranca/seguranca/master/content/exclusion_logs.png)

## Sprint 3 (16/05)
 - Metodos para criar uma conexão com o banco de dados propria para a lista de exclusão;

    ![Alt Text](https://raw.githubusercontent.com/fatec-seguranca/seguranca/master/content/print_db_routes.png)
 - Front end para consumir os metodos de criação de conexão com o banco de dados, nesse interface será possível criar a conexão e validar se a mesma é valida;
    ![Alt Text](https://raw.githubusercontent.com/fatec-seguranca/seguranca/master/content/git_database_form.gif)
 - Validações para que não seja possível cadastrar um id que não existe na base de dados.
    ![Alt Text](https://raw.githubusercontent.com/fatec-seguranca/seguranca/master/content/gif_exl_form_erros.gif)

## Sprint 4 (05/06)
 - Transpor todas os serviços implementados no arquivo "ExclusionListService" para a estrutura de um modulo plugável:

```
Para instalar o modulo basta executar essa linha 
no terminal:

npm i exclusion-list
```
 - Implementar esse modulo no backend para validar o funcionamento:
    ![Alt Text](https://raw.githubusercontent.com/fatec-seguranca/seguranca/master/content/sprint_final.png)
    
 - Documentar esse modulo de forma que seja muito claro como é feita a configuração e como os métodos são consumidos.

   - A documentação do modulo pode ser encontrada na sua pagina no [npm](https://www.npmjs.com/package/exclusion-list/)

# Membros do Grupo

<table>
    <thead>
        <th>Integrantes</th>
    </thead>
    <tbody>
        <tr>
            <td>Arthur Mergulhão</td>
            <td><a href = "#">Linkedin</a></td>
            <td><a href = "#">Github</a></td>
        </tr>
        <tr>
            <td>João Pedro Esteves</td> 
            <td><a href = "#">Linkedin</a></td> 
            <td><a href = "#"> Github</a> </td>
        </tr>
        <tr>
            <td>Matheus Rodrigues</td>
            <td> <a href= "#">Linkedin</a></td>
            <td> <a href= "#">Github</a></td>
        </tr>
        <tr>
            <td>Leandro Gomes Pereira</td>
            <td><a href= "#">Linkedin</a></td>
            <td><a href = "#">Github</a></td>
        </tr>
        <tr>
            <td>Luara Goulart</td> 
            <td><a href = "#">Linkedin</a></td>
            <td><a href = "#">Github</a></td>
        </tr>
    </tbody>
</table>