export default function (context) {
    const { store, redirect, route } = context
    // console.log('[context]', context)
    // if(!store.state.user && route.path !== '/login' && route.path !== '/register'  && route.path !== '/'){
    //     return redirect('/')
    // }
    if (!store.state.user) {
        return redirect('/login')
    }
}