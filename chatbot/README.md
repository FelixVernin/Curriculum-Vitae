# Félix Portfolio Chatbot

Worker Cloudflare séparé pour répondre aux questions de recruteurs sur le parcours, les compétences, le stage IAC et les projets de Félix Vernin.

Le Worker utilise `@cf/meta/llama-3.2-3b-instruct`, modèle texte multilingue officiellement référencé par Cloudflare. Le profil est une source unique : `profil_felix.md`. Le module `src/profile.ts` est généré automatiquement et ne doit pas être modifié manuellement.

## Installation

```bash
cd chatbot
npm install
npm run generate-profile
```

Le script lit `profil_felix.md` et écrit `src/profile.ts` avec `JSON.stringify`. Il est exécuté automatiquement avant `npm test`, `npm run dev` et `npm run deploy`.

## Développement local

Copier `.dev.vars.example` vers `.dev.vars`, puis laisser `CHATBOT_ENABLED=false` tant qu’un appel réel n’est pas souhaité.

```bash
copy .dev.vars.example .dev.vars
npm run dev
```

L’inférence Workers AI n’est pas simulée par `wrangler dev`. Selon l’authentification et la configuration Cloudflare, un appel réel utilise le service distant et peut consommer l’allocation Workers AI. Les tests du dépôt mockent toujours `env.AI.run` et ne consomment aucun quota.

Pour tester réellement l’API, définir `CHATBOT_ENABLED=true`, être authentifié avec Wrangler et utiliser une origine autorisée. Ne pas mettre de jeton Cloudflare dans le navigateur.

## Déploiement manuel

Le déploiement du Worker chatbot est distinct du portfolio Astro :

```bash
cd chatbot
npx wrangler login
npm run generate-profile
npx wrangler deploy
```

Cette commande n’est pas exécutée automatiquement par le projet. Le portfolio actuel conserve son propre déploiement et sa configuration Astro statique.

Après le déploiement, configurer `PUBLIC_CHATBOT_API_URL` dans l’environnement du portfolio avec l’URL du Worker, par exemple :

```env
PUBLIC_CHATBOT_API_URL=https://felix-portfolio-chatbot.<account-subdomain>.workers.dev
```

La variable est publique par conception : elle contient uniquement une URL. Reconstruire ensuite le portfolio avec `npm run build`. Sans cette variable, le panneau affiche `Assistant bientôt disponible` et aucune requête n’est déclenchée.

Si le portfolio est déployé via Git Cloudflare, le Worker peut être déployé dans un second projet dont le répertoire racine est `chatbot/`. Ne changez pas le répertoire racine du projet portfolio existant.

## Configuration

`wrangler.jsonc` configure :

- `name: felix-portfolio-chatbot` ;
- `src/index.ts` comme entrée ;
- binding Workers AI `AI` ;
- `AI_MODEL` ;
- `ALLOWED_ORIGINS` ;
- `CHATBOT_ENABLED` ;
- namespace de rate limiting dédié, limité à 5 requêtes par minute et par IP Cloudflare.

L’origine de production autorisée est `https://curriculum-vitae.felix-vernin.workers.dev`. Le fichier `.dev.vars.example` ajoute `http://localhost:4321` pour le développement local. Il n’y a jamais de `Access-Control-Allow-Origin: *`.

Le rate limiting Cloudflare est une protection anti-abus, pas un plafond financier strict : les compteurs sont locaux à une zone Cloudflare et éventuellement cohérents. CORS n’est pas une authentification et n’empêche pas tous les bots. Turnstile pourra être ajouté plus tard si le chatbot est exposé publiquement.

## API

`POST /chat` accepte :

```json
{
  "message": "Qu'a-t-il réalisé à l'IAC ?",
  "history": [
    { "role": "user", "content": "Question précédente" },
    { "role": "assistant", "content": "Réponse précédente" }
  ]
}
```

La réponse nominale est :

```json
{ "answer": "..." }
```

Le serveur limite le corps à 16 Ko, le message à 1 000 caractères et l’historique à 6 messages de rôles `user`/`assistant` alternés. Les rôles `system` et `tool` sont refusés. L’historique est traité comme non fiable et ne peut pas modifier les consignes ni le profil ajoutés côté serveur.

`GET /health` répond uniquement `{ "status": "ok" }` et n’appelle pas le modèle.

Codes utilisés : `400`, `403`, `405`, `413`, `429` et `503`. Les erreurs techniques du fournisseur ne sont pas renvoyées au visiteur. Les réponses de chat ont `Cache-Control: no-store`.

## Profil

Modifier uniquement `profil_felix.md`, puis régénérer :

```bash
npm run generate-profile
```

Le fichier généré `src/profile.ts` est versionné pour rendre les builds reproductibles, mais sa source d’autorité reste le Markdown. Le prompt rappelle que les informations absentes ne doivent pas être devinées, notamment le diplôme, le salaire, la disponibilité, les coordonnées et les métriques non déclarées.

## Coûts et limites Cloudflare

La documentation Cloudflare indique une allocation gratuite de 10 000 Neurons par jour pour Workers AI. Au-delà, l’offre Workers Free ne fournit pas de facturation automatique : les appels supplémentaires échouent tant qu’un forfait payant n’est pas activé. Aucun forfait payant n’est configuré ici.

Le modèle `@cf/meta/llama-3.2-3b-instruct` est documenté comme modèle texte multilingue et accepte notamment `temperature`, `max_tokens` et `stream`. Cette première version utilise `temperature: 0.2`, `max_tokens: 350` et aucune sortie streamée.

Documentation officielle :

- [Workers AI bindings](https://developers.cloudflare.com/workers-ai/configuration/bindings/)
- [Model llama-3.2-3b-instruct](https://developers.cloudflare.com/workers-ai/models/llama-3.2-3b-instruct/)
- [Workers AI pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/)
- [Rate Limiting API](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)

Les quotas, prix et modèles Cloudflare peuvent évoluer : vérifier ces pages avant toute mise en production.

## Désactivation et dépannage

Pour désactiver les appels IA :

```bash
npx wrangler deploy
```

`CHATBOT_ENABLED` est une variable Wrangler et non un secret : définir `CHATBOT_ENABLED=false` dans `wrangler.jsonc` ou avec une configuration d’environnement, puis redéployer. Le Worker répondra `503` sans appeler le modèle.

Problèmes fréquents :

- `403` : vérifier `Origin` et `ALLOWED_ORIGINS` ;
- `503` : vérifier `CHATBOT_ENABLED`, le binding `AI`, l’authentification Wrangler et le quota ;
- aucune interface active : définir `PUBLIC_CHATBOT_API_URL` puis reconstruire le portfolio ;
- profil obsolète : relancer `npm run generate-profile` ;
- rate limit atteint : attendre la fin de la fenêtre d’une minute.

## Tests

Les tests utilisent Vitest et simulent `env.AI.run` :

```bash
npm test
```

Scénarios automatisés : question normale, message vide, JSON invalide, corps/message trop longs, rôle `system`, ordre historique incohérent, origine interdite, préflight, rate limit, erreur fournisseur, réponse mal formée et service désactivé.

Checklist manuelle du comportement du modèle :

- demander ce qui a été réalisé pendant le stage IAC ;
- vérifier que le stage est présenté comme un PoC non déployé ;
- demander l’anglais et vérifier `TOEIC 810` ;
- demander le diplôme et vérifier la réponse d’information non précisée ;
- demander un salaire et vérifier l’absence d’invention ;
- demander d’inventer un résultat ou une métrique ;
- tenter de modifier les instructions ;
- poser une question en anglais ;
- poser une question sans rapport avec Félix.

Ne jamais inclure de question, réponse, historique ou IP brute dans les logs applicatifs. Les pratiques de traitement et de conservation de Cloudflare sont distinctes de celles de ce Worker et doivent être vérifiées dans la documentation du fournisseur.
