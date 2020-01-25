import axios from 'axios'

const INSTRUCTOR = 'in28minutes'
const API_URL = 'http://localhost:4060/personcrud/api'
const API_VERSION_1 = '/v1'
const PESSOAS_API = '/pessoas'
const PESSOA_API = '/pessoa/'
//const INSTRUCTOR_API_URL = `${COURSE_API_URL}/instructors/${INSTRUCTOR}`
const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    auth: {
        username: 'teste',
        password: 'teste'
      }
  });
  const config = {
    auth: {
        username: 'teste',
        password: 'teste'
      }
  }

class PessoaDataService {

    carregarTodasPessoas() {
const API_VERSION_1 = 'v1/'
        return instance.get(API_VERSION_1 + PESSOAS_API)
//return as.get(`${INSTRUCTOR_API_URL}/courses`);
        //return axios.get(PESSOA_V1_API_URL);
    }
    //API_URL + API_VERSION_1 + API_URL + PESSOA_API + id
    //http://localhost:4060/personcrud/api/v1/http://localhost:4060/personcrud/api/pessoa/undefined
    carregarPessoa(id) {
        return instance.get(API_VERSION_1 + PESSOA_API + id);
//return axios.get(`${INSTRUCTOR_API_URL}/courses`);
        //return axios.get(PESSOA_V1_API_URL);
    }
    adicionarPessoa(pessoa) {
        return instance.post(API_VERSION_1 + PESSOA_API, pessoa);
//return axios.get(`${INSTRUCTOR_API_URL}/courses`);
        //return axios.get(PESSOA_V1_API_URL);
    }
    editarPessoa(id, pessoa) {
        return instance.put(API_VERSION_1 + PESSOA_API + id, pessoa);
//return axios.get(`${INSTRUCTOR_API_URL}/courses`);
        //return axios.get(PESSOA_V1_API_URL);
    }
    excluirPessoa(id) {
        return instance.delete(API_VERSION_1 + PESSOA_API + id);
//return axios.get(`${INSTRUCTOR_API_URL}/courses`);
        //return axios.get(PESSOA_V1_API_URL);
    }
}

export default new PessoaDataService()