'use strict'

const Projection = use('App/Models/Projection')

class ProjectionController {

    /**
     * Projection index
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async index ({request, response}) {
        try {
            const items = await Projection.all()
            response.send({success: true, items });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Projection item
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  params   The URI params
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async item ({request, params, response}) {
        try {
            const item = await Projection.find(params.id)
            response.send({success: true, item });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Projection store
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async store ({request, response}) {
        try {

            // Get input
            const post = request.post()

            // Validate input
            const errors = await Projection.validate(post)
            if (errors) return response.send({
                success: false,
                error: 'Invalid item',
                errors
            })

            // Fields to save
            var data = {
                srid: post.srid,
                proj4_params: post.proj4_params,
                extent: post.extent
            }

            // Save
            var item = await Projection.find(post.id || null)
            if (item) item.merge(data)
            else item = await Projection.create(data)
            await item.save()

            // Send response
            response.send({success: true, item });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Remove item
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  params   The URI params
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async remove ({request, params, response}) {
        try {
            const item = await Projection.find(params.id)
            await item.delete()
            response.send({success: true});
        } catch (error) {
          response.send({success: false, error: error.message})
        }
    }
}

module.exports = ProjectionController