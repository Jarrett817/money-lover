//总是获取到最大的一个id+1，防止重复
let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0;

function createId() {
    id++;
    window.localStorage.setItem('_idMax', id.toString());
    return id;
}

export default createId;