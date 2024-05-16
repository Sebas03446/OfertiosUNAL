export default defineNuxtRouteMiddleware(async () => {
    const client = useSupabaseClient();
    const { data, err } = await client.auth.getSession();
    if (err) {
        console.log('err', err)
        return
        //return navigateTo('/');
    }
    const user = data?.session?.user
    console.log(data)
    console.log(user)
    /* if (!user) {
        return navigateTo('/');
    } */
});

