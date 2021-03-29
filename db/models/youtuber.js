const {Model} = require("objection");

class Youtuber extends Model{
    static get tableName() {
        return 'youtuber';
      }

      static get relationMappings() {

        const Channel = require('./channel');
        return{
            channel:{
                relation: Model.HasOneRelation,
                modelClass: Channel,
                join:{
                    from: 'youtuber.channelId',
                    to: 'channel.id'
                }
            }
        }

      }
}

module.exports = Youtuber;