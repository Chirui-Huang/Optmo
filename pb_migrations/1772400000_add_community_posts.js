/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const usersCollection = app.findCollectionByNameOrId("users")

  const communityPostsCollection = new Collection({
    "type": "base",
    "name": "community_posts",
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.id != ''",
    "updateRule": "user = @request.auth.id",
    "deleteRule": "user = @request.auth.id",
    "fields": [
      {
        "name": "user",
        "type": "relation",
        "required": true,
        "collectionId": usersCollection.id,
        "maxSelect": 1,
        "cascadeDelete": true
      },
      {
        "name": "title",
        "type": "text",
        "required": true,
        "max": 150
      },
      {
        "name": "content",
        "type": "text",
        "required": true,
        "max": 5000
      },
      {
        "name": "category",
        "type": "text",
        "max": 40
      },
      {
        "name": "tags",
        "type": "json"
      }
    ],
    "indexes": [
      "CREATE INDEX idx_community_posts_created ON community_posts (created)",
      "CREATE INDEX idx_community_posts_user ON community_posts (user)",
      "CREATE INDEX idx_community_posts_category ON community_posts (category)"
    ]
  })

  app.save(communityPostsCollection)
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("community_posts")
    app.delete(collection)
  } catch (_) {
  }
})
