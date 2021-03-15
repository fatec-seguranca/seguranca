# Seguranca

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
 - Estruturação do banco de dados;
 - Persistencia de dados implementada no sistema.
## Sprint 2 (18/04)
 - Exposição de algumas funcionalidades do sistema e uma rotas de uma Api;
 - Rotinas para registrar quais dados devem ser apagados assim que um backup for restaurado.
## Sprint 3 (16/05)
 - Rotinas que sejam executadas assim que um backup do banco de dados for restaurado.

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