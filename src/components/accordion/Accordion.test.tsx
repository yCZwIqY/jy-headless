import { render, screen } from '@testing-library/react';
import Accordion from './Accordion';
import DownArrowIcon from '../icons/DownArrowIcon';
import { expect, userEvent } from '@storybook/test';

describe('Accordion Component', () => {
  it('should render AccordionSummary and AccordionDetail correctly', () => {
    render(
      <Accordion isOpen={false} setIsOpen={() => {}}>
        <Accordion.Summary icon={<DownArrowIcon />}>Summary</Accordion.Summary>
        <Accordion.Detail>Detail</Accordion.Detail>
      </Accordion>,
    );

    // AccordionSummary와 AccordionDetail이 렌더링되는지 확인
    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText('Detail')).toBeInTheDocument();
  });

  it('should open and close Accordion when isOpen changes', async () => {
    const setIsOpen = jest.fn();
    const { rerender, container } = render(
      <Accordion isOpen={false} setIsOpen={setIsOpen}>
        <Accordion.Summary icon={<DownArrowIcon />}>Summary</Accordion.Summary>
        <Accordion.Detail>Detail</Accordion.Detail>
      </Accordion>,
    );

    // Accordion이 닫힌 상태에서 열리도록 상태 업데이트
    await userEvent.click(screen.getByText('Summary'));
    expect(setIsOpen).toHaveBeenCalledTimes(1);
    expect(setIsOpen).toHaveBeenCalledWith(true);

    // Accordion이 열린 상태로 리렌더링
    rerender(
      <Accordion isOpen={true} setIsOpen={setIsOpen}>
        <Accordion.Summary icon={<DownArrowIcon />}>Summary</Accordion.Summary>
        <Accordion.Detail>Detail</Accordion.Detail>
      </Accordion>,
    );

    // 다시 클릭하여 닫기
    await userEvent.click(screen.getByText('Summary'));
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  it('should render default DownArrowIcon in AccordionSummary', () => {
    render(
      <Accordion isOpen={false} setIsOpen={() => {}}>
        <Accordion.Summary>Summary</Accordion.Summary>
      </Accordion>,
    );

    // 기본으로 DownArrowIcon이 렌더링되었는지 확인
    expect(screen.getByTestId('down-arrow-icon')).toBeInTheDocument();
  });

  it('should call setIsOpen on toggle', async () => {
    const setIsOpen = jest.fn();

    render(
      <Accordion isOpen={false} setIsOpen={setIsOpen}>
        <Accordion.Summary>Summary</Accordion.Summary>
        <Accordion.Detail>Detail</Accordion.Detail>
      </Accordion>,
    );

    // Summary 클릭 후 setIsOpen이 호출되는지 확인
    await userEvent.click(screen.getByText('Summary'));
    expect(setIsOpen).toHaveBeenCalledWith(true);

    // 다시 클릭하여 setIsOpen이 false로 호출되는지 확인
    await userEvent.click(screen.getByText('Summary'));
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });
});
