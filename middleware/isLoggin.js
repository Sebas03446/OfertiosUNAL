export default defineNuxtRouteMiddleware(async () => {
    const client = useSupabaseClient();
    const { data, err } = await client.auth.getSession();
    if (err) {
        return navigateTo('/');
    }
    const user = data?.session?.user
    console.log('User:', user);
    if (!user) {
        return navigateTo('/');
    }
});

