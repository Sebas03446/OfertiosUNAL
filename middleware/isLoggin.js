export default defineNuxtRouteMiddleware(async () => {
    const client = useSupabaseClient();
    const { data, err } = await client.auth.getSession();
    if (err) {
        console.log('err', err)
        return navigateTo('/');
    }
    const user = data?.session?.user
    console.log('user', user)
    console.log('data', data)
    console.log('err', err)

    if (!user) {
        return navigateTo('/');
    }
});

