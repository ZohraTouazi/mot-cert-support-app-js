// ===== IMPORTS =====
// These give us access to the component, routing support,
// testing helpers, and the mock backend tool
import ProjectList from '../components/ProjectList';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import nock from 'nock';


// ===== ARRANGE =====
// Prepare the system state before the test runs.
// We mock the backend API so that when ProjectList
// requests /v1/project, it receives predictable data.
nock('http://localhost')
  .persist()
  .get('/v1/project')
  .reply(200, [
    {
      id: "1",
      name: "Project 1",
      description: "This is the first project"
    },
    {
      id: "2",
      name: "Project 2",
      description: "This is the second project"
    }
  ]);


// ===== TEST =====
describe('ProjectList', () => {
  it('renders the list of projects correctly', async () => {

    // ===== ACT =====
    // Render the ProjectList component.
    // MemoryRouter is required because the app uses routing.
    // Rendering triggers the API call, which is intercepted by nock.
    const { asFragment, findByText } = render(
      <MemoryRouter>
        <ProjectList />
      </MemoryRouter>
    );

    // ===== ASSERT (part 1) =====
    // Wait until the UI shows data coming from the mocked API.
    // If "Project 1" never appears, the test fails.
    await findByText('Project 1');

    // ===== ASSERT (part 2) =====
    // Capture the rendered HTML and compare it
    // against a previously approved snapshot.
    // If the UI structure changes unexpectedly, the test fails.
    expect(asFragment()).toMatchSnapshot();
  });
});
