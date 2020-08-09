import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';

interface ScheduleItemProps {
  week_day: number;
  from: string;
  to: string;
}

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsApp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState<ScheduleItemProps[]>([
    {
      week_day: 0,
      from: '',
      to: '',
    },
  ]);

  function handleAddNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: '08:00',
        to: '12:00',
      },
    ]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string,
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return {
          ...scheduleItem,
          [field]: field === 'week_day' ? Number(value) : value,
        };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    api
      .post('/classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert('Cadastro realizado com sucesso!');
        history.push('/');
      })
      .catch(() => alert('Erro no cadastro'));
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas!"
        description="O primeiro passo é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={event => setAvatar(event.target.value)}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={event => setWhatsApp(event.target.value)}
            />
            <TextArea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={event => setBio(event.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={event => setSubject(event.target.value)}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciência', label: 'Ciência' },
                { value: 'Ed. Fisíca', label: 'Ed. Fisíca' },
                { value: 'Ed. Fisíca', label: 'Ed. Fisíca' },
                { value: 'Fisíca', label: 'Fisíca' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'Matemática', label: 'Matemática' },
              ]}
            />
            <Input
              name="cost"
              label="Custa da sua hora por aula"
              value={cost}
              onChange={event => setCost(event.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={handleAddNewScheduleItem}>
                + Novo Horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={event =>
                    setScheduleItemValue(index, 'week_day', event.target.value)
                  } // eslint-disable-line
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '4', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                />

                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={event =>
                    setScheduleItemValue(index, 'from', event.target.value)
                  } // eslint-disable-line
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={event =>
                    setScheduleItemValue(index, 'to', event.target.value)
                  } // eslint-disable-line
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante!
              <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
