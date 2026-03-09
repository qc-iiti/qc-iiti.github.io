# ⚛️ QC-IITI Website

Welcome to the official repository of **QC-IITI's Website**, the Quantum Computing Club at IIT Indore.  
This project is built using *Next.js*, *TypeScript*, and *Tailwind CSS* to deliver a modern, scalable, and responsive web experience.

---

## 📂 Project Structure

```sh
src/
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── pages/             # Page-based routing (Next.js)
├── styles/            # Global styles and Tailwind configs
├── types/             # TypeScript type definitions
├── utils/             # Utility functions/helpers
```

### Local Development Setup
Follow the steps below to set up the project locally and start contributing.

#### ✅ Step 1: Fork & Clone

If you're not part of the dev team, you will need to fork this repository to contribute.
To clone this repoistory to your local machine, run 

```bash
git clone https://github.com/qc-iiti/qc-iiti.github.io.git
```

#### 🧩 Step 2: Install Dependencies

Install project dependencies using [Yarn](https://classic.yarnpkg.com/).
```sh
yarn install
```

If yarn is not installed on your system you may run `npm install --global yarn`

#### ▶️ Step 3: Start the Dev Server

Run the project on a local server:
```sh
yarn run dev 
```
Visit `http://localhost:3000` in your browser to view the site.

### ✏️ Making Contributions
Want to improve the website or add features? Great! Here's how to do it properly:

#### 🛠️ Step 1: Make Your Changes
Work on your changes in VS Code or your preferred IDE.

Add new pages, components, styles, etc.

#### 💾 Step 2: Commit and Push
Once done, commit and push your work:

```sh
git add .
git commit -m "your message here"
git push origin <your-branch-name>
```

#### 🔃 Step 3: Create a Pull Request

Go to your branch or forked repo on GitHub. Click `Compare & pull request`.

Target the `dev` branch of this repo (not `main`).


> [!WARNING]
> PRs should always target the dev branch.

> [!TIP]
> - Write meaningful commit messages.
> - Keep changes focused (avoid unrelated fixes in one PR).
> - Your PR will be reviewed and merged by maintainers.
> - Submit your pull request.