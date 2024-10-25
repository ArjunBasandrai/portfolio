import '../../styles/globals.css';
import ProjectsPage from "@/pages/ProjectsPage";

import { gql } from "@apollo/client";
import client from "../../lib/apollo-client"

export default async function Projects() {
    const { data } = await client.query({
      query: gql`
        query {
          publication(id: "6717ca18fd2be89bc676fc81") {
            series(slug: "featured") {
              id
              name
              posts(first: 20) {
                edges {
                  node {
                    id
                    title
                    subtitle
                    content {
                      html
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });
  
    const series = data.publication.series;
    
    console.log(series.posts.edges[0].node);
  
    return (
      <div className="mt-[100px]">
        <ProjectsPage />
      </div>
    );
  }
  