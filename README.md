# NextVerse

### Roadmap
- [x] Open Source 
- [x] Help Pages
- [x] Authentication W/ Github
- [ ] Admin Panel
- [ ] Course Chapter Editor
- [ ] Course Chapter Lesson Editor
- [ ] Course Lesson Quiz Questions
- [ ] User Course Progress [calculated by their quiz success rate]
- [ ] User Dashboard
- [ ] User Favourites
- [ ] User Subscription


### Data Structure
#### user
- id
- name
- email
- image
- admin
- chapters
- lessons
- stripeCustomerId
- stripeSubscriptionId
- stripePriceId
- stripePriceId
- stripeCurrentPeriodEnd
- createdAt
- updatedAt
#### chapter
- id
- name
- slug
- description
- thumbnail
- lessons
- createdAt
- updatedAt
#### lesson
- id
- name
- slug
- description
- thumbnail
- video
- questions - todo: add questions/entries/answers to data structure
- createdAt
- updatedAt
- author_id
- author
- chapter_id
- chapter