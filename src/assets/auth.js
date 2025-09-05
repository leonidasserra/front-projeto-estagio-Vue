import { useRouter } from 'vue-router';

export function isTokenValid(){
  
const accessToken = localStorage.getItem('accessToken');
const expiresIn = localStorage.getItem('expiresIn');
const router = useRouter();
  // Verifica se o token existe E se ele não expirou
if (accessToken && Date.now() < parseInt(expiresIn)) {
    return true
} else {
    // Token expirou ou não existe, limpa o localStorage e redireciona para o login
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresIn');
      router.push({
    name: 'Login'
    });
    return false
}
}

