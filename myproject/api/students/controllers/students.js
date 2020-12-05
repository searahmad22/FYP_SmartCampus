'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
    /**
     * Create a record.
     *
     * @return {Object}
     */

    async newCreate(ctx) {

        //extracs "name" and "class" from the email
        
        //var name = "";
        //var classUCA = "";

        //var s1 = true;
        //var s2 = false;
        //var i;
        //for (i = 0; i < email.length; i++) {
        //    if (s1 && email[i] != "." && email[i] != "_") {
        //        name += email[i];
        //    } else if (email[i] == ".") {
        //        name += " ";
        //    } else if (email[i] == "_") {
        //        s1 = false;
        //        s2 = true;
        //    }
        //    if (email[i] == "@") {
        //        s2 = false;
        //    } if (s2 && email[i] != "_") {
        //        classUCA += email[i];
        //    }
        //}//extraction ends
        var email = ctx.request.body.Email;
        const splitedEmail = email.split('_');

        const fullName = splitedEmail[0].split('.');
        const classname = splitedEmail[1].split('@')[0];
        const name = (fullName[0][0].toUpperCase() + fullName[0].slice(1)) + " " + (fullName[1][0].toUpperCase() + fullName[1].slice(1));
        

        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.services.students.create(data, { files });
        } else {
            entity = await strapi.services.students.create({...ctx.request.body, Name: name, Class: classname});
        }
        return sanitizeEntity(entity, { model: strapi.models.students });
    },
};
