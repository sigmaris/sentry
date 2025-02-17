import {Fragment} from 'react';

import {act, render, screen, userEvent} from 'sentry-test/reactTestingLibrary';

import {Hovercard, HOVERCARD_PORTAL_ID} from 'sentry/components/hovercard';

describe('Hovercard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('reuses portal', () => {
    render(
      <Fragment>
        <Hovercard
          position="top"
          body="Hovercard Body"
          header="Hovercard Header"
          displayTimeout={0}
        >
          Hovercard Trigger
        </Hovercard>
        <Hovercard
          position="top"
          body="Hovercard Body"
          header="Hovercard Header"
          displayTimeout={0}
        >
          Hovercard Trigger
        </Hovercard>
      </Fragment>
    );

    // eslint-disable-next-line
    expect(document.querySelectorAll(`#${HOVERCARD_PORTAL_ID}`)).toHaveLength(1);
  });
  it('Displays card', async () => {
    render(
      <Hovercard
        position="top"
        body="Hovercard Body"
        header="Hovercard Header"
        displayTimeout={0}
      >
        Hovercard Trigger
      </Hovercard>
    );

    userEvent.hover(screen.getByText('Hovercard Trigger'));

    expect(await screen.findByText(/Hovercard Body/)).toBeInTheDocument();
    expect(await screen.findByText(/Hovercard Header/)).toBeInTheDocument();
  });

  it('Does not display card', () => {
    render(
      <Hovercard
        position="top"
        body="Hovercard Body"
        header="Hovercard Header"
        displayTimeout={0}
        show={false}
      >
        Hovercard Trigger
      </Hovercard>
    );

    userEvent.hover(screen.getByText('Hovercard Trigger'));
    jest.runAllTimers();

    expect(screen.queryByText(/Hovercard Body/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Hovercard Header/)).not.toBeInTheDocument();
  });

  it('Always displays card', () => {
    render(
      <Hovercard
        position="top"
        body="Hovercard Body"
        header="Hovercard Header"
        displayTimeout={0}
        show
      >
        Hovercard Trigger
      </Hovercard>
    );

    expect(screen.getByText(/Hovercard Body/)).toBeInTheDocument();
    expect(screen.getByText(/Hovercard Header/)).toBeInTheDocument();
  });

  it('Respects displayTimeout displays card', async () => {
    const DISPLAY_TIMEOUT = 100;
    render(
      <Hovercard
        position="top"
        body="Hovercard Body"
        header="Hovercard Header"
        displayTimeout={DISPLAY_TIMEOUT}
      >
        Hovercard Trigger
      </Hovercard>
    );

    userEvent.hover(screen.getByText('Hovercard Trigger'));

    act(() => {
      jest.advanceTimersByTime(DISPLAY_TIMEOUT - 1);
    });

    expect(screen.queryByText(/Hovercard Body/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Hovercard Header/)).not.toBeInTheDocument();

    expect(await screen.findByText(/Hovercard Body/)).toBeInTheDocument();
    expect(await screen.findByText(/Hovercard Header/)).toBeInTheDocument();
  });

  it('Doesnt leak timeout', () => {
    render(
      <Hovercard
        position="top"
        body="Hovercard Body"
        header="Hovercard Header"
        displayTimeout={100}
      >
        Hovercard Trigger
      </Hovercard>
    );

    userEvent.hover(screen.getByText('Hovercard Trigger'));

    act(() => {
      jest.advanceTimersByTime(99);
    });

    expect(screen.queryByText(/Hovercard Body/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Hovercard Header/)).not.toBeInTheDocument();

    userEvent.unhover(screen.getByText('Hovercard Trigger'));

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(screen.queryByText(/Hovercard Body/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Hovercard Header/)).not.toBeInTheDocument();
  });
});
