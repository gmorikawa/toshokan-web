# Journal

## 2025-11-14

After making the list, create form and update form for _Topic_ model, I've asked _Copilot_ to generate the same pages but for other models (author, category, language, organization, and publisher).

> In this application I already create the CRUD for Topic entity, which is described in entities/models/topic.ts. The CRUD pages are located in pages/app/topic, where there are two sub directories: form and list. List refers to the page that lists all the registered data for the Topic context, and form refers to the form for create and update a topic. Related also to the topic entity, there is a services class located in services/topic-service.ts, which makes the necessary HTTP requests to the API.
> Now, based on the examples of topic generate the same structures of pages and service for Category, Language, Organization, Authors, and Publisher. They follow simple patterns like Topic.

By using the previous prompt, _Copilot_ created the necessary file structure for all the contexts requested, without any errors. There were some cases in the forms that it couldn't handle very well, but, for the record, I hadn't given any examples of how to handle those cases.

The big surprise to me is that it could "understand" very well the command to use the Topic's pages as example. So it used the same custom components that I had created instead of emulating the effect of the page.

Next, I'd made some updates in the code, enhancing the encapsulation and structure of the elements in the page. All the pages should have the following structure:

```jsx
<ApplicationPage>
    <ApplicationHeader
        title="Title"
        actionSlot={<Actions>}
    />

    <ApplicationContent>
        ...content
    </ApplicationContent>
</ApplicationPage>
```

So I asked _Copilot_ to refactor all the pages that he had previously created to fit in the new standard.

> In this application I already create the CRUD for Topic entity, which is described in entities/models/topic.ts. The CRUD pages are located in pages/app/topic, where there are two sub directories: form and list. List refers to the page that lists all the registered data for the Topic context, and form refers to the form for create and update a topic. Related also to the topic entity, there is a services class located in services/topic-service.ts, which makes the necessary HTTP requests to the API.
> Now, based on the examples of topic generate the same structures of pages and service for Category, Language, Organization, Authors, and Publisher. They follow simple patterns like Topic.

Not only the code refactor was execute without errors, it also "understood" that some elements were supposed to be removed. Those elements were not something that would crash the application if remained, but weren't necessary at all.
