export default (req) => {        
    if(req){
        return req.state['auth-token'];         
    } else if(typeof window !== 'undefined') {               
        return localStorage.getItem('auth-token');
    }
}