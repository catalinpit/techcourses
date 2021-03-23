async function gql(query, variables={}) {
    const data = await fetch('/admin/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            variables,
            query
        })
    });

    return data.json();
}

const GET_COURSES = `
    query GetCourses {
        allCourses {
            name
            releaseDate
            comments {
                id
            }
        }
    }
`;

gql(GET_COURSES)
    .then(result => {
        console.log(result.data);

        const list = document.createElement('ul');

        result.data.allCourses.forEach(course => {
            let listItem = document.createElement('li');
            listItem.innerText = `${course.name} - ${course.releaseDate}`;
            list.appendChild(listItem);
        })

        document.body.appendChild(list);
    });

document.getElementById('courses').parentNode.innerHTML = `
<div class="app">
  <div class="form-wrapper">
    <h2 class="app-heading">Courses in tech</h2>
    <div class="results">
    </div>
  </div>
</div>`;
