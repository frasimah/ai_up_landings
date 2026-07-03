import { ReactNode } from "react";

type props = {
   children: ReactNode;
   id?: string;
}

function KnowledgeSingleArticleContent({ children, id }: props) {
   return (
      <div id={id} className="article-content-shell article-content-shell--knowledge">
         {children}
      </div>
   );
}

export default KnowledgeSingleArticleContent;
