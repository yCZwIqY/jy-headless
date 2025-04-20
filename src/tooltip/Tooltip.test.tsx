import { render, screen } from '@testing-library/react';
import Tooltip from './index';
import { userEvent } from '@testing-library/user-event';
import { expect } from '@storybook/test';

describe('Tooltip', () => {
  it('Tooltip이 기본적으로 렌더링 된다.', () => {
    render(
      <Tooltip>
        hover me
        <Tooltip.Label>Tooltip content</Tooltip.Label>
      </Tooltip>,
    );
    expect(screen.getByText('hover me')).toBeInTheDocument();
  });

  it('마우스를 올리면 Tooltip.Label이 나타난다.', async () => {
    render(
      <Tooltip>
        <div>hover me</div>
        <Tooltip.Label>Tooltip content</Tooltip.Label>
      </Tooltip>,
    );

    const trigger = screen.getByText('hover me');
    const label = screen.getByText('Tooltip content');

    expect(label).toHaveStyle('visibility: hidden');

    await userEvent.hover(trigger);

    expect(label).toHaveStyle('visibility: visible');
  });

  it('Tooltip이 top 위치일 때 position 스타일이 적용된다.', async () => {
    render(
      <Tooltip position="top">
        <div>hover me</div>
        <Tooltip.Label data-testid="tooltip-label">Tooltip on top</Tooltip.Label>
      </Tooltip>,
    );

    const trigger = screen.getByText('hover me');
    await userEvent.hover(trigger);

    const label = screen.getByTestId('tooltip-label');
    expect(label.style.position).toBe('absolute');
  });

  it('Tooltip.Label에 커스텀 스타일이 적용된다.', async () => {
    render(
      <Tooltip>
        <div>hover me</div>
        <Tooltip.Label data-testid="tooltip-label" style={{ backgroundColor: 'blue' }}>
          Styled tooltip
        </Tooltip.Label>
      </Tooltip>,
    );

    const trigger = screen.getByText('hover me');
    await userEvent.hover(trigger);

    const label = screen.getByTestId('tooltip-label');
    expect(label).toHaveStyle({ backgroundColor: 'blue' });
  });
});
