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
 - Implementar um front basico;
 - Desenvolver uma forma para que a lista de execução seja executada apenas uma vez em cada base de dados, independente de quantas vezes o sistema for reiniciado.

## Sprint 3 (16/05)
 - Deixar a funcionalidade que registra e executa a lista de exclusões mais genéria para que possa ser consumida como uma biblioteca ao invés de ser uma parte do sistema;

## Sprint 4 (05/06)


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