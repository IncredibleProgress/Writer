# Writer

Publication de textes et de réflexions personnelles avec 
[Astro](https://astro.build/) et [Tailwind CSS](https://tailwindcss.com/).

Voir le site : https://incredibleprogress.github.io/Writer/

## Principes

Ci-après le fichier Astro, réduit pour l'exemple et ne contenant pas l'intégralité du code, utilisé pour générer la publication. GitHub Action permet ensuite de déployer automatiquement le code HTML généré sur GitHub Pages à l'adresse indiquée ci-dessus.

```astro
---
import '../styles/tailwind.css'
import { getCollection, render } from 'astro:content'
// Récupération des articles publiés (markdown files)
const articles = (await getCollection('articles'))
  .filter(article => article.data.status !== 'draft')
---
<html lang="fr" class=
"text-stone-900 bg-stone-200 selection:bg-stone-300
font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',Georgia,serif]">
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="/Writer/favicon.png" />
  <meta name="viewport" content="width=device-width" />
  <title>Writer</title>
</head>
<body class="flex mx-auto max-w-5xl">
  <!-- Titre de la publication -->
  <h1 class="my-2 text-center text-3xl font-light italic text-stone-950">
    Les Mots & Le Sens </h1>
  <!-- Contenu de la publication -->
  {articles.map(async (article) => {
    const { Content } = await render(article)
    return (
      <article id={article.id} class=
      "p-8 mb-10 bg-stone-100 border-b border-stone-300 shadow-lg rounded-lg">
        <h2 class=
        "mt-6 mb-6 font-semibold uppercase tracking-[0.18em] text-stone-600">
          {article.data.title}</h2>
        <div class=
        "mb-6 text-[1.1rem] leading-[1.8] tracking-[0.02em] [&_p]:mb-3 [&_p]:indent-1">
          <Content /></div>
      </article>
    );
  })}
</body>
</html>
```

## Publications
### Les Mots & Le Sens

Pour ainsi dire, la sottise est bien confortable ; tandis que la bêtise est envahissante.

Elle s’invite, se répand, emplit le vide et s’installe. Elle rompt le silence, devient assourdissante et rend impossible l’harmonie.

Dieu nous en préserve ; le bon sens tient celle-ci à distance. Les imprudents croiront en être dotés suffisamment, alors que, quelque bonne fortune créditant le propos, les plus orgueilleux argueront d’en être bien pourvus. Il est cependant remarquable que d’aucuns en possèdent tant pour le partager.

N’en déplaise aux plus assurés, la chose est ardue : se garder de la bêtise est, en substance, le projet d’une vie. Il impose aux intéressés la discipline d’un questionnement fréquent sur ce qui est pensé comme sur ce qui est entrepris. À cette condition, il devient moins hasardeux de ne pas se confondre, d’autant que la volonté et la sagesse l’autorisent.

Pour Montaigne, percevant les réalités du monde en mouvement et se défiant de tout préjugé, la vérité d’un jour n’est pas de facto la vérité des lendemains. Son intemporel « Que sais-je ? » l’atteste, il est aussi utile que nécessaire de reconsidérer la validité des acquis. Mais devant l’exigence, la plupart chercheront des faux-fuyants ; c’est ainsi que la doctrine des uns s’avère pour d’autres très accommodante.

Alors en des temps marqués par le désordre ambiant, est-ce une résolution déraisonnable que de se rendre digne de quelques illustres « influenceurs », ceux-là mêmes qui ont façonné ce que nos sociétés détiennent de plus inestimable ?

À cet endroit, je propose au lecteur un voyage dont la destination est la clairvoyance, précisément là où mène l'érudition, voulant élucider les énigmes, d’abord pour m'élever moi-même, puis pour au moins autant que ce qui me concerne, transmettre à d’autres l’envie de suivre un semblable chemin.
