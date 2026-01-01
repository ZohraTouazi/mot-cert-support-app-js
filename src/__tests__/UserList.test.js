// ===== IMPORTS =====
// These give us access to the component, routing support,
// testing helpers, and the mock backend tool
import ProjectList from '../components/ManageUsers';
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
  .get('/v1/user')
  .reply(200, [
    {
      id: "1",
      name: "Admin",
      description: "This is the first user"
    },
    {
      id: "2",
      name: "Email",
      description: "This is the Email"
    }
  ]);


// ===== TEST =====
describe('UserList', () => {
  it('renders the list of Users correctly', async () => {

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
    await findByText('Admin');

    // ===== ASSERT (part 2) =====
    // Capture the rendered HTML and compare it
    // against a previously approved snapshot.
    // If the UI structure changes unexpectedly, the test fails.
    expect(asFragment()).toMatchSnapshot();
  });
});
