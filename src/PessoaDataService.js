import {config, instance} from './userService'

const API_URL = config.API_URL
const API_VERSION_1 = config.API_VERSION_1
const PESSOAS_API = config.PESSOAS_API
const PESSOA_API = config.PESSOA_API
  
class PessoaDataService {

    carregarTodasPessoas() {
        return instance.get(API_VERSION_1 + PESSOAS_API)
    }
    carregarPessoa(id) {
        return instance.get(API_VERSION_1 + PESSOA_API + id);
    }
    adicionarPessoa(pessoa) {
        return instance.post(API_VERSION_1 + PESSOA_API, pessoa);
    }
    editarPessoa(id, pessoa) {
        return instance.put(API_VERSION_1 + PESSOA_API + id, pessoa);
    }
    excluirPessoa(id) {
        return instance.delete(API_VERSION_1 + PESSOA_API + id);
    }
}

export default new PessoaDataService()