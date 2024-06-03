use clap::Parser;

#[derive(Parser)]
struct Args {
    #[arg(short, long)]
    subcmd: SubCommand,
    option: String,
}

#[derive(Debug)]
enum SubCommand {
    Post,
    Get,
    Unknown(String),
}

impl std::str::FromStr for SubCommand {
    type Err = ();

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "post" => Ok(SubCommand::Post),
            "get" => Ok(SubCommand::Get),
            _ => Ok(SubCommand::Unknown(s.to_string())),
        }
    }
}

fn main() {
    let args = Args::parse();

    match args.subcmd {
        SubCommand::Post => {
            println!("Post command selected with option: {}", args.option);
        }
        SubCommand::Get => {
            println!("Get command selected with option: {}", args.option);
        }
        SubCommand::Unknown(ref cmd) => {
            println!("Unknown command: {}", cmd);
        }
    }
}
