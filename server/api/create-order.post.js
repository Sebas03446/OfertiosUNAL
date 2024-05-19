import { Preference } from 'mercadopago'

export default defineEventHandler(async event => {
	const runtimeConfig = useRuntimeConfig()
	const body = await readBody(event)

	switch (body.payment_method) {
		case 'mercadopago':
			const preference = new Preference(mercadopago)

			const response = await preference.create({
				body: {
					auto_return: 'approved',
					back_urls: {
						success: `${runtimeConfig.baseUrl}/thank-you`,
						failure: `${runtimeConfig.baseUrl}/failure`,
					},
					items: [
						{
							id: body.product_name
								.toLowerCase()
								.replace(' ', '_'),
							quantity: 1,
							title: body.product_name,
							unit_price: 2000 ,
						},
					],
				},
			})

			return { url: response.init_point }
		default:
			setResponseStatus(event, 400)
			return { error: 'Invalid payment platform' }
	}
})