import { useTranslation } from 'react-i18next';
import avatar2 from '../assets/avatar2.svg';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column h-100">
      <div className="text-center">
        <img alt="Страница не найдена" className="img-fluid h-25" src={avatar2} />
        <h1 className="h4 text-muted">{t('errorPage.notFound')}</h1>
        <p className="text-muted">
          {`${t('errorPage.mainPage')} `}
          <a href="/">
            {t('errorPage.goIn')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
