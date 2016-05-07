var Document = require('camo').Document;

class Card extends Document {
    constructor() {
        super();

        this.title = String;
        this.archived = {
            type: String,
            default: false
        };
        listId: {
          type: String,
          optional: true,
          default: "SPT3tXBSqiWgN6gRb"
        },
    }

    static collectionName() {
        return 'movies';
    }
}
