@prototypes_data = [
  {
    name: 'First module / First prototype'
  },
  {
    name: 'First oscillator'
  },
  {
    name: 'HW1_screen'
  },
  {
    name: 'Create buttons prototype'
  },
  {
    name: 'React button'
  },
  {
    name: 'HW2_slider'
  },
  {
    name: 'Tone js'
  },
  {
    name: 'my_synth'
  }
]

def seed
  reset_db
  create_prototypes
end

def reset_db
  Rake::Task['db:drop'].invoke
  Rake::Task['db:create'].invoke
  Rake::Task['db:migrate'].invoke
end

def create_prototypes
  @prototypes_data.each do |prototype_data|
    prototype = Prototype.create!(prototype_data)
    puts "#{prototype.name} prototype just created"
  end
end

seed
